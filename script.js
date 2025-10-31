define(['jquery', 'underscore', 'twigjs'], function ($, _, Twig) {
  var CustomWidget = function () {
    var self = this;

    this.getTemplate = _.bind(function (template, params, callback) {
      params = (typeof params == 'object') ? params : {};
      template = template || '';

      return this.render({
        href: 'templates/' + template + '.twig',
        base_path: this.params.path,
        v: this.get_version(),
        load: callback
      }, params);
    }, this);

    this.callbacks = {
      render: function () {
        return true;
      },

      init: _.bind(function () {
        return true;
      }, this),

      bind_actions: function () {
        return true;
      },

      settings: function ($settings_body, context) {
        // Получаем account_id текущего аккаунта amoCRM
        var account_id = AMOCRM.constant('account').id;

        // Формируем URL с подстановкой ID
        var bot_url = 'https://a.imprice.ai/amocrm_bk/amocrm/tg_bot/' + account_id;

        // Вставляем HTML с обновлённой ссылкой
        $settings_body.html(`
          <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: auto; padding: 20px; text-align: center; line-height: 1.6; background-color: #f9f9f9; border-radius: 8px;">

            <!-- Заголовок -->
            <h2 style="color: #0072CE;">Виджет успешно установлен 🎉</h2>

            <!-- Краткая информация -->
            <p style="font-size: 16px;">
              Теперь вы можете получать управленческую аналитику из вашей <b>amoCRM</b> прямо в <b>Telegram</b> — 
              ежедневно и по запросу.
            </p>

            <p style="font-size: 15px; color: #555;">
              Запустите бота, чтобы выбрать воронки, этапы продаж и включить ежедневную рассылку.
            </p>

            <!-- Кнопка -->
            <div style="margin-top: 20px;">
              <a class="button input"
                href="${bot_url}"
                target="_blank"
                style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; transition: 0.2s;">
                Перейти в бота
              </a>
            </div>

            <!-- Подсказка -->
            <p style="margin-top: 15px; color: #888; font-size: 14px;">
              Нажмите кнопку, чтобы запустить ImpulseBot в Telegram и завершить настройку.
            </p>

          </div>
        `);
      },

      onSave: function () {
        return true;
      },

      destroy: function () {},

      advancedSettings: _.bind(function () {
        var $work_area = $('#work-area-' + self.get_settings().widget_code),
          $save_button = $(
            Twig({ ref: '/tmpl/controls/button.twig' }).render({
              text: 'Сохранить',
              class_name: 'button-input_blue button-input-disabled js-button-save-' + self.get_settings().widget_code,
            })
          ),
          $cancel_button = $(
            Twig({ ref: '/tmpl/controls/cancel_button.twig' }).render({
              text: 'Отмена',
              class_name: 'button-input-disabled js-button-cancel-' + self.get_settings().widget_code,
            })
          );

        $save_button.prop('disabled', true);
        $('.content__top__preset').css({ float: 'left' });

        $('.list__body-right__top').css({ display: 'block' })
          .append('<div class="list__body-right__top__buttons"></div>');
        $('.list__body-right__top__buttons').css({ float: 'right' })
          .append($cancel_button)
          .append($save_button);

        self.getTemplate('advanced_settings', {}, function (template) {
          var $page = $(template.render({ title: self.i18n('advanced').title, widget_code: self.get_settings().widget_code }));
          $work_area.append($page);
        });
      }, self),
    };

    return this;
  };

  return CustomWidget;
});
