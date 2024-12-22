export const a11yProps = (index: number) => {
    return {
        id: `x-tab-${index}`,
        'aria-controls': `tabs-tabpanel-${index}`,
    };
}