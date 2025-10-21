"use client";

import {
  Button,
  Card,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import type { TableProps } from "antd";
import { useCallback, useMemo, useState, type Key } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMany, deletePerson } from "./people.slice";
import { selectPeopleItems } from "./people.selectors";
import type { Person } from "./people.types";
import PersonForm from "./PersonForm";

type PersonTableProps = TableProps<Person>;

const PAGE_SIZE = 5;

const PeoplePanel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const people = useAppSelector(selectPeopleItems);

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPerson, setEditingPerson] = useState<Person | undefined>();

  const handleAddPerson = useCallback(() => {
    setEditingPerson(undefined);
    setIsModalOpen(true);
  }, []);

  const handleEditPerson = useCallback((person: Person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingPerson(undefined);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deletePerson(id));
      message.success(t("actions.delete"));
      setSelectedRowKeys((keys) => keys.filter((key) => key !== id));
    },
    [dispatch, t],
  );

  const handleDeleteSelected = useCallback(() => {
    if (selectedRowKeys.length === 0) {
      return;
    }
    dispatch(deleteMany(selectedRowKeys));
    message.success(t("actions.deleteSelected"));
    setSelectedRowKeys([]);
  }, [dispatch, selectedRowKeys, t]);

  const handleSelectionChange = useCallback((keys: Key[]) => {
    setSelectedRowKeys(keys.map(String));
  }, []);

  const columns = useMemo<PersonTableProps["columns"]>(
    () => [
      {
        title: t("people.name"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("people.email"),
        dataIndex: "email",
        key: "email",
      },
      {
        title: t("people.phone"),
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: t("people.birthday"),
        dataIndex: "birthday",
        key: "birthday",
        render: (value: string) =>
          value ? dayjs(value).format("YYYY-MM-DD") : "-",
      },
      {
        title: t("actions.edit"),
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button type="link" onClick={() => handleEditPerson(record)}>
              {t("actions.edit")}
            </Button>
            <Popconfirm
              title={t("actions.delete")}
              okText={t("actions.delete")}
              cancelText={t("actions.cancel")}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="link" danger>
                {t("actions.delete")}
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleDelete, handleEditPerson, t],
  );

  const rowSelection = useMemo<PersonTableProps["rowSelection"]>(
    () => ({
      selectedRowKeys,
      onChange: handleSelectionChange,
    }),
    [handleSelectionChange, selectedRowKeys],
  );

  return (
    <>
      <Card
        title={
          <Typography.Title level={4} style={{ margin: 0 }}>
            {t("people.title")}
          </Typography.Title>
        }
        extra={
          <Space>
            <Button type="primary" onClick={handleAddPerson}>
              {t("actions.add")}
            </Button>
            <Button
              danger
              onClick={handleDeleteSelected}
              disabled={selectedRowKeys.length === 0}
            >
              {t("actions.deleteSelected")}
            </Button>
          </Space>
        }
      >
        <Table<Person>
          rowKey="id"
          dataSource={people}
          columns={columns}
          rowSelection={rowSelection}
          pagination={{ pageSize: PAGE_SIZE }}
        />
      </Card>
      <PersonForm
        open={isModalOpen}
        onClose={handleCloseModal}
        person={editingPerson}
      />
    </>
  );
};

export default PeoplePanel;
