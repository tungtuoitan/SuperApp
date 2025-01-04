export interface ITabsContainer {
    tabs: TabItem[]
}

export interface TabItem {
    label: string
    tabComponent: React.ReactNode
    disabled?: boolean
    badge?: number
    icon?: React.ReactNode
}