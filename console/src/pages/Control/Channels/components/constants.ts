import type { TFunction } from "i18next";

// Channel key type - now accepts any string for custom channels
export type ChannelKey = string;

// Built-in channel labels
export const CHANNEL_LABELS: Record<string, string> = {
  imessage: "iMessage",
  discord: "Discord",
  dingtalk: "DingTalk",
  feishu: "Feishu",
  qq: "QQ",
  telegram: "Telegram",
  mqtt: "MQTT",
  mattermost: "Mattermost",
  matrix: "Matrix",
  console: "Console",
  voice: "Twilio",
  wecom: "WeCom",
  xiaoyi: "XiaoYi",
  weixin: "WeChat",
};

function formatCustomChannelKey(key: string): string {
  return key
    .split(/[_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isChineseUiLanguage(language?: string): boolean {
  return Boolean(language?.toLowerCase()?.startsWith("zh"));
}

// Chinese UI: `channels.channelNames.*` in zh.json. Other locales: English from CHANNEL_LABELS.
// Pass `uiLanguage` from `i18n.resolvedLanguage || i18n.language` — `t` from useTranslation often has no `.i18n` attached.
export function getChannelLabel(
  key: string,
  t?: TFunction,
  uiLanguage?: string,
): string {
  const english = CHANNEL_LABELS[key] ?? formatCustomChannelKey(key);
  if (t && isChineseUiLanguage(uiLanguage)) {
    return t(`channels.channelNames.${key}`, { defaultValue: english });
  }
  return english;
}
