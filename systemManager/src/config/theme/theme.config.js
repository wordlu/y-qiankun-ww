import publicValue_lugia_theme_lugia_web from "./@lugia-theme-lugia-web/default/publicValue";
import theme_lugia_theme_lugia_web from "./@lugia-theme-lugia-web/default/widgetDefaultTheme";

export default {
  publicValue: [
    {
      moduleName: "@lugia/lugia-web",
      value: publicValue_lugia_theme_lugia_web.publicValue
    }
  ],
  widgetDefaultTheme: { ...theme_lugia_theme_lugia_web }
};
