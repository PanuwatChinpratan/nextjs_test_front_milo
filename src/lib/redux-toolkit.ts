export interface PayloadAction<Payload = unknown> {
  type: string;
  payload: Payload;
}

type Reducer<State> = (
  state: State | undefined,
  action: PayloadAction<unknown>,
) => State;

type ReducersMap<StateMap extends Record<string, unknown>> = {
  [K in keyof StateMap]: Reducer<StateMap[K]>;
};

export interface Store<State> {
  getState(): State;
  dispatch(action: PayloadAction<unknown>): void;
  subscribe(listener: () => void): () => void;
}

export const configureStore = <StateMap extends Record<string, unknown>>({
  reducer,
  preloadedState,
}: {
  reducer: ReducersMap<StateMap>;
  preloadedState?: StateMap;
}): Store<StateMap> => {
  const listeners = new Set<() => void>();
  const reducerKeys = Object.keys(reducer) as Array<keyof StateMap>;

  const computeInitialState = (): StateMap => {
    const state = {} as StateMap;
    reducerKeys.forEach((key) => {
      const sliceReducer = reducer[key];
      state[key] = sliceReducer(undefined, {
        type: "@@INIT",
        payload: undefined,
      });
    });
    return state;
  };

  let state =
    preloadedState ?? computeInitialState();

  const getState = () => state;

  const dispatch = (action: PayloadAction<unknown>) => {
    const nextState = { ...state } as StateMap;
    reducerKeys.forEach((key) => {
      const sliceReducer = reducer[key];
      const previousSliceState = state[key];
      const updatedSliceState = sliceReducer(previousSliceState, action);
      nextState[key] = updatedSliceState;
    });
    state = nextState;
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};
