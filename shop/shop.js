async function onConfigChange(config) {
  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontStack = "'Yu Mincho', 'YuMincho', serif";
  const fontFamily = `${customFont}, ${baseFontStack}`;
  const baseSize = config.font_size || defaultConfig.font_size;

  const backgroundColor = config.background_color || defaultConfig.background_color;
  const surfaceColor = config.surface_color || defaultConfig.surface_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
  const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;

  // body にフォント・背景・文字色を反映
  document.body.style.fontFamily = fontFamily;
  document.body.style.background = `linear-gradient(180deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`;
  document.body.style.color = textColor;

  // サイトタイトル
  const siteTitle = document.getElementById('site-title');
  if (siteTitle) {
    siteTitle.textContent = config.site_title || defaultConfig.site_title;
    siteTitle.style.fontSize = `${baseSize * 2.625}px`;
    siteTitle.style.color = textColor;
  }

  // hero-text
  const heroTextEl = document.getElementById('hero-text');
  if (heroTextEl) {
    const heroText = (config.hero_text || defaultConfig.hero_text).replace(/\n/g, '<br>');
    heroTextEl.innerHTML = heroText;
    heroTextEl.style.fontSize = `${baseSize}px`;
    heroTextEl.style.color = textColor;
  }

  // footer-about
  const footerAbout = document.getElementById('footer-about');
  if (footerAbout) {
    footerAbout.textContent = config.footer_about || defaultConfig.footer_about;
    footerAbout.style.fontSize = `${baseSize * 0.875}px`;
  }

  // copyright
  const copyrightEl = document.getElementById('copyright');
  if (copyrightEl) {
    copyrightEl.textContent = config.copyright_text || defaultConfig.copyright_text;
    copyrightEl.style.fontSize = `${baseSize * 0.6875}px`;
  }

  // brand-card の背景色
  const brandCards = document.querySelectorAll('.brand-card');
  brandCards.forEach(card => {
    card.style.background = surfaceColor;
  });

  // theme-item のフォントサイズ
  const themeItems = document.querySelectorAll('.theme-item');
  themeItems.forEach(item => {
    item.style.fontSize = `${baseSize * 1.125}px`;
  });

  // social-icon の色
  const style = document.createElement('style');
  style.textContent = `
    .social-icon {
      background: ${primaryActionColor}33;
    }
    .social-icon:hover {
      background: ${primaryActionColor};
    }
  `;
  const existingStyle = document.querySelector('style[data-dynamic]');
  if (existingStyle) existingStyle.remove();
  style.setAttribute('data-dynamic', 'true');
  document.head.appendChild(style);
}
document.addEventListener("DOMContentLoaded", function () {

});

// SDK 初期化
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (value) => {
            config.surface_color = value;
            window.elementSdk.setConfig({ surface_color: value });
          }
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => {
            config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        },
        {
          get: () => config.primary_action_color || defaultConfig.primary_action_color,
          set: (value) => {
            config.primary_action_color = value;
            window.elementSdk.setConfig({ primary_action_color: value });
          }
        },
        {
          get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
          set: (value) => {
            config.secondary_action_color = value;
            window.elementSdk.setConfig({ secondary_action_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (value) => {
          config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (value) => {
          config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ["site_title", config.site_title || defaultConfig.site_title],
      ["hero_text", config.hero_text || defaultConfig.hero_text],
      ["footer_about", config.footer_about || defaultConfig.footer_about],
      ["copyright_text", config.copyright_text || defaultConfig.copyright_text]
    ])
  });
}
