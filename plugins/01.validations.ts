import { configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import { all } from '@vee-validate/rules'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(() => {
  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule)
  })

  defineRule('password', (value: any) => (new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/).test(value)))
  configure({
    generateMessage: localize('ru', {
      messages: {
        _default: 'Поле {field} некорректно',
        alpha: 'Поле {field} может содержать только буквы',
        alpha_num: 'Поле {field} может содержать только буквы и цифры',
        alpha_dash: 'Поле {field} может содержать только буквы, цифры и дефис',
        alpha_spaces: 'Поле {field} может содержать только буквы и пробелы',
        between: 'Поле {field} должно быть числом между 0:{min} и 1:{max}',
        confirmed: 'Поле {field} не совпадает с другим полем',
        digits: 'Поле {field} должно быть числом ровно из 0:{length} цифр',
        dimensions: 'Поле {field} должно быть изображением 0:{width} пикселей на 1:{height} пикселей',
        email: 'Электронный адрес указан неверно.',
        not_one_of: 'Поле {field} должно быть допустимым значением',
        ext: 'Поле {field} должно быть действительным файлом',
        image: 'Поле {field} должно быть изображением',
        integer: 'Поле {field} должно быть целым числом',
        length: 'Длина поля {field} должна быть 0:{length}',
        max_value: 'Поле {field} должно быть числом 0:{max} или меньше',
        max: 'Поле {field} не может быть длиннее 0:{length} символов',
        mimes: 'Поле {field} должно иметь допустимый тип файла',
        min_value: 'Поле {field} должно быть числом 0:{min} или больше',
        min: 'Поле {field} должно быть не короче 0:{length} символов',
        numeric: 'Поле {field} должно быть числом',
        one_of: 'Поле {field} должно быть допустимым значением',
        regex: 'Поле {field} имеет некорректный формат',
        required_if: 'Обязательное поле.',
        required: 'Обязательное поле.',
        size: 'Поле {field} должно быть меньше, чем 0:{size}KB',
        url: 'Поле {field} содержит ссылку в некорректном формате',
      },
    }),
  })
})
