import { TLBaseEvProvider } from "./4_Ev/EvStore"
import { TimeConfigProvider } from "./3_TimeConfig/TimeConfigStore"
import { TLBaseBgProvider } from "./1_TLBaseBg/TLBaseBgStore"
import { TLBaseFgProvider } from "./2_TLBaseFg/TLBaseFgStore"
import { TabItem, TLTabsContainer } from "./TLTabsContainer"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TLContainer from "./TLContainer"

export const TLProvider = () => {

    return (
            <TLBaseFgProvider>
                <TLBaseBgProvider>
                    <TimeConfigProvider>
                        <TLBaseEvProvider>
                            <TLTabsContainer tabs={[{ label: 'TL', tabComponent: <TLContainer/>, icon: <CalendarTodayIcon/> } as TabItem] }/>
                        </TLBaseEvProvider>
                    </TimeConfigProvider>
                </TLBaseBgProvider>
            </TLBaseFgProvider>
    )
}
