import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type MenuButtonProps = {
    background?: string
}
// только функция может принять props
//theme из-за провайдера (телепорт без props)
export const MenuButton = styled(Button)<MenuButtonProps>(({background, theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 0 ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.contrastText}`,
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || theme.palette.primary.light
}))