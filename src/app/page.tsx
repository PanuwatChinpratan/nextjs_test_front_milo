"use client";

import "@/i18n/i18n";
import {
  ConfigProvider,
  Layout,
  Space,
  Tabs,
  Typography,
  theme as antdTheme,
} from "antd";
import { useMemo } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PeoplePanel from "@/features/people/PeoplePanel";
import ShapesPanel from "@/features/shapes/ShapesPanel";

const { useToken } = antdTheme;
const { Content } = Layout;

const PageContent = () => {
  const { t } = useTranslation();
  const {
    token: { colorBgContainer },
  } = useToken();

  const tabItems = useMemo(
    () => [
      {
        key: "shapes",
        label: t("tabs.shape"),
        children: <ShapesPanel />,
      },
      {
        key: "people",
        label: t("tabs.people"),
        children: <PeoplePanel />,
      },
    ],
    [t],
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        padding: 24,
        background: colorBgContainer,
      }}
    >
      <Content style={{ maxWidth: 1040, margin: "0 auto", width: "100%" }}>
        <Space
          align="center"
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Typography.Title level={3} style={{ margin: 0, color: "var(--orange)" }}>
            Swift Dynamics Frontend Test
          </Typography.Title>
          <LanguageSwitcher />
        </Space>
        <Tabs defaultActiveKey="shapes" items={tabItems} />
      </Content>
    </Layout>
  );
};

export default function Page() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFA200",
        },
      }}
    >
      <PageContent />
    </ConfigProvider>
  );
}
