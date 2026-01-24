import type { ElementType } from "react";

const TYPOGRAPHY_FEATURE_SS10 = "[font-feature-settings:'ss10'_on]";

// 첨부 스펙: font-size(px) / line-height(%) / letter-spacing(px) / weight / color / feature-settings
export const TYPOGRAPHY_VARIANTS = {
  display1: `text-[#171719] text-[56px] font-bold leading-[128.6%] tracking-[-1.786px]`,
  display2: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[40px] font-bold leading-[130%] tracking-[-1.128px]`,

  title1: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[36px] font-bold leading-[133.4%] tracking-[-0.972px]`,
  title2: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[28px] font-bold leading-[135.8%] tracking-[-0.661px]`,
  title3: `text-[#171719] text-[24px] font-bold leading-[133.4%] tracking-[-0.552px]`,

  heading1: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[22px] font-semibold leading-[136.4%] tracking-[-0.427px]`,
  heading2: `text-[#171719] text-[20px] font-semibold leading-[140%] tracking-[-0.24px]`,

  headline1: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[18px] font-semibold leading-[144.5%] tracking-[-0.004px]`,
  headline2: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[17px] font-semibold leading-[141.2%] tracking-[0px]`,

  body1Normal: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[16px] font-normal leading-[150%] tracking-[0.091px]`,
  body1Reading: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[16px] font-normal leading-[162.5%] tracking-[0.091px]`,

  body2Normal: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[15px] font-normal leading-[146.7%] tracking-[0.144px]`,
  body2Reading: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[15px] font-normal leading-[160%] tracking-[0.144px]`,

  label1Normal: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[14px] font-semibold leading-[142.9%] tracking-[0.203px]`,
  label1Reading: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[14px] font-semibold leading-[157.14%] tracking-[0.203px]`,
  label2: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[13px] font-normal leading-[138.5%] tracking-[0.252px]`,

  caption1: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[12px] font-normal leading-[133.4%] tracking-[0.302px]`,
  caption2: `text-[#171719] ${TYPOGRAPHY_FEATURE_SS10} text-[11px] font-normal leading-[127.3%] tracking-[0.342px]`,
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANTS;

export const DEFAULT_TAG_BY_VARIANT: Record<TypographyVariant, ElementType> = {
  display1: "h1",
  display2: "h2",
  title1: "h3",
  title2: "h4",
  title3: "h5",
  heading1: "h6",
  heading2: "h6",

  headline1: "p",
  headline2: "p",

  body1Normal: "p",
  body1Reading: "p",
  body2Normal: "p",
  body2Reading: "p",

  label1Normal: "span",
  label1Reading: "span",
  label2: "span",

  caption1: "span",
  caption2: "span",
};
