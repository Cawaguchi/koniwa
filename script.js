const defaultConfig = {
  site_title: "文具と雑貨の小径",
  site_subtitle: "— サイトをめぐる静かなギャラリー —",
  hero_text: "今日もまた、静かな小径を歩く。\n紙の香り、硝子の光、布の手ざわり。\nそのひとつひとつに、名前のある物語が息づいています。",
  gallery_title: "─ 小径に並ぶブランドたち ─",
  gallery_description: "ゆっくりとスクロールしながら、小径を歩くように巡ってください。",
  feature_title: "今月の小径：秋の布と灯り",
  feature_description: "柔らかなウール、やさしい光のランプ。\n冬を迎える準備をする、あたたかな時間。",
  footer_about: "静かにものを感じる場所として、この小径をつくりました。",
  copyright_text: "© BunGu no Komichi",
  background_color: "#f5f3f0",
  surface_color: "#ffffff",
  text_color: "#4a4a4a",
  primary_action_color: "#b8a896",
  secondary_action_color: "#8a8a8a",
  font_family: "Noto Serif JP",
  font_size: 16
};

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

  document.body.style.fontFamily = fontFamily;
  document.body.style.background = `linear-gradient(180deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`;
  document.body.style.color = textColor;

  document.getElementById('site-title').textContent = config.site_title || defaultConfig.site_title;
  document.getElementById('site-title').style.fontSize = `${baseSize * 2.625}px`;
  document.getElementById('site-title').style.color = textColor;

  document.getElementById('site-subtitle').textContent = config.site_subtitle || defaultConfig.site_subtitle;
  document.getElementById('site-subtitle').style.fontSize = `${baseSize * 0.8125}px`;
  document.getElementById('site-subtitle').style.color = secondaryActionColor;

  const heroText = (config.hero_text || defaultConfig.hero_text).replace(/\n/g, '<br>');
  document.getElementById('hero-text').innerHTML = heroText;
  document.getElementById('hero-text').style.fontSize = `${baseSize}px`;
  document.getElementById('hero-text').style.color = textColor;

  document.getElementById('gallery-title').textContent = config.gallery_title || defaultConfig.gallery_title;
  document.getElementById('gallery-title').style.fontSize = `${baseSize * 1.5}px`;
  document.getElementById('gallery-title').style.color = textColor;

  document.getElementById('gallery-description').textContent = config.gallery_description || defaultConfig.gallery_description;
  document.getElementById('gallery-description').style.fontSize = `${baseSize * 0.875}px`;

  document.getElementById('feature-title').textContent = config.feature_title || defaultConfig.feature_title;
  document.getElementById('feature-title').style.fontSize = `${baseSize * 1.75}px`;
  document.getElementById('feature-title').style.color = textColor;

  const featureDesc = (config.feature_description || defaultConfig.feature_description).replace(/\n/g, '<br>');
  document.getElementById('feature-description').innerHTML = featureDesc;
  document.getElementById('feature-description').style.fontSize = `${baseSize * 0.9375}px`;

  document.getElementById('footer-about').textContent = config.footer_about || defaultConfig.footer_about;
  document.getElementById('footer-about').style.fontSize = `${baseSize * 0.875}px`;

  document.getElementById('copyright').textContent = config.copyright_text || defaultConfig.copyright_text;
  document.getElementById('copyright').style.fontSize = `${baseSize * 0.6875}px`;

  const brandCards = document.querySelectorAll('.brand-card');
  brandCards.forEach(card => {
    card.style.background = surfaceColor;
  });

  const themeItems = document.querySelectorAll('.theme-item');
  themeItems.forEach(item => {
    item.style.fontSize = `${baseSize * 1.125}px`;
  });

  const featureLink = document.querySelector('.feature-link');
  featureLink.style.borderColor = primaryActionColor;
  featureLink.style.fontSize = `${baseSize * 0.8125}px`;

  const style = document.createElement('style');
  style.textContent = `
    .theme-item:hover {
      border-bottom-color: ${primaryActionColor};
    }
    .feature-link:hover {
      background: ${primaryActionColor};
    }
    .social-icon {
      background: ${primaryActionColor}33;
    }
    .social-icon:hover {
      background: ${primaryActionColor};
    }
  `;
  const existingStyle = document.querySelector('style[data-dynamic]');
  if (existingStyle) {
    existingStyle.remove();
  }
  style.setAttribute('data-dynamic', 'true');
  document.head.appendChild(style);
}

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
      ["site_subtitle", config.site_subtitle || defaultConfig.site_subtitle],
      ["hero_text", config.hero_text || defaultConfig.hero_text],
      ["gallery_title", config.gallery_title || defaultConfig.gallery_title],
      ["gallery_description", config.gallery_description || defaultConfig.gallery_description],
      ["feature_title", config.feature_title || defaultConfig.feature_title],
      ["feature_description", config.feature_description || defaultConfig.feature_description],
      ["footer_about", config.footer_about || defaultConfig.footer_about],
      ["copyright_text", config.copyright_text || defaultConfig.copyright_text]
    ])
  });
}