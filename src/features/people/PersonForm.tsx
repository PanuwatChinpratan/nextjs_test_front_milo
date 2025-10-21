"use client";

import { DatePicker, Form, Input, Modal, message } from "antd";
import { useEffect, useMemo } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import dayjs, { type Dayjs } from "dayjs";
import { useAppDispatch } from "@/store/hooks";
import { addPerson, updatePerson } from "./people.slice";
import type { Person } from "./people.types";

interface PersonFormProps {
  open: boolean;
  onClose: () => void;
  person?: Person;
}

interface PersonFormValues {
  name: string;
  email: string;
  phone: string;
  birthday: Dayjs | null;
}

const INITIAL_VALUES: PersonFormValues = {
  name: "",
  email: "",
  phone: "",
  birthday: null,
};

const mapPersonToForm = (person?: Person): PersonFormValues => {
  if (!person) {
    return INITIAL_VALUES;
  }

  return {
    name: person.name,
    email: person.email,
    phone: person.phone,
    birthday: person.birthday ? dayjs(person.birthday) : null,
  };
};

const PersonForm = ({ open, onClose, person }: PersonFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<PersonFormValues>();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(mapPersonToForm(person));
    } else {
      form.resetFields();
    }
  }, [open, person, form]);

  const modalTitle = useMemo(
    () =>
      person
        ? `${t("actions.edit")} ${t("people.formTitle")}`
        : `${t("actions.add")} ${t("people.formTitle")}`,
    [person, t],
  );

  const handleFinish = async (values: PersonFormValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      birthday: values.birthday ? values.birthday.toISOString() : "",
    };

    if (person) {
      dispatch(updatePerson({ ...person, ...payload }));
    } else {
      const id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2, 10);

      dispatch(addPerson({ ...payload, id }));
    }

    message.success(t("actions.save"));
    onClose();
  };

  return (
    <Modal
      open={open}
      title={modalTitle}
      okText={t("actions.save")}
      cancelText={t("actions.cancel")}
      onCancel={onClose}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form<PersonFormValues>
        form={form}
        layout="vertical"
        initialValues={INITIAL_VALUES}
        onFinish={handleFinish}
      >
        <Form.Item
          name="name"
          label={t("people.name")}
          rules={[{ required: true, message: t("people.name") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={t("people.email")}
          rules={[
            { required: true, message: t("people.email") },
            { type: "email", message: t("people.email") },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t("people.phone")}
          rules={[{ required: true, message: t("people.phone") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birthday"
          label={t("people.birthday")}
          rules={[{ required: true, message: t("people.birthday") }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PersonForm;
