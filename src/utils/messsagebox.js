import { MessageBox } from 'element-ui'

export const confirm = ({ message, title, type }) => {
    return MessageBox(message, title, type)
}
