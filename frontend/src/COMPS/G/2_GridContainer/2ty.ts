export type SiconProps = {
    type?: 'icon-link' | 'icon-btn' | 'just-icon'

    link?: string

    iconCode?: string
    handle?: (e: React.MouseEvent<HTMLButtonElement>) => void
    dbHandle?: (e: React.MouseEvent<HTMLButtonElement>) => void
    title?: string

    iconSize?: number
    iconSx?: any
    btnSize?: 16|20|24|32|40| number
    btnSx?: any
    color?: string
}


export type GridStatee = 'default'|'relearn' |
 'inprogress-review-today' | 
 'inprogress-review-later' |
 'open-knowledge' |
  'all-knowledge' | 'all-folder'
