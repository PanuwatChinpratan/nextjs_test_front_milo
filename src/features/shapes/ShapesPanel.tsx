"use client";

import { Button, Card, Space, Typography } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import styles from "./shapes.module.css";
import { rotateLeft, shuffle } from "./shapes.logic";
import type { ShapeItem } from "./shapes.types";

const baseShapes: ShapeItem[] = [
  { id: "shape-circle", kind: "circle", order: 0 },
  { id: "shape-square", kind: "square", order: 1 },
  { id: "shape-rounded", kind: "rounded", order: 2 },
  { id: "shape-pill", kind: "pill", order: 3 },
  { id: "shape-diamond", kind: "diamond", order: 4 },
  { id: "shape-triangle", kind: "triangle", order: 5 },
];

const normalizeOrder = (items: ShapeItem[]): ShapeItem[] =>
  items.map((item, index) => ({ ...item, order: index }));

const ShapesPanel = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<ShapeItem[]>(() => normalizeOrder(baseShapes));
  const [invertRows, setInvertRows] = useState<boolean>(false);

  const handleRotateLeft = useCallback(() => {
    setShapes((current) =>
      normalizeOrder(rotateLeft([...current].sort((a, b) => a.order - b.order))),
    );
  }, []);

  const handleToggleInvert = useCallback(() => {
    setInvertRows((value) => !value);
  }, []);

  const handleRandomize = useCallback(() => {
    setShapes((current) => normalizeOrder(shuffle(current)));
  }, []);

  const orderedShapes = useMemo(
    () => [...shapes].sort((a, b) => a.order - b.order),
    [shapes],
  );

  return (
    <Card>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Space wrap>
          <Button onClick={handleRotateLeft}>{t("shape.moveShape")}</Button>
          <Button onClick={handleToggleInvert}>{t("shape.movePosition")}</Button>
        </Space>
        <Typography.Text type="secondary">{t("shape.hint")}</Typography.Text>
        <div
          className={`${styles.grid}${invertRows ? ` ${styles.invert}` : ""}`}
        >
          {orderedShapes.map((shape) => {
            const orderClass = styles[`order${shape.order}`] ?? "";
            const classes = [
              styles.shape,
              styles[shape.kind],
              orderClass,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={shape.id}
                type="button"
                className={classes}
                onClick={handleRandomize}
                aria-label={shape.kind}
              />
            );
          })}
        </div>
      </Space>
    </Card>
  );
};

export default ShapesPanel;
