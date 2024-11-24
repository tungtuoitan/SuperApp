
import { TLProvider } from './TLStore'
import { TLBaseProvider } from './TLBase/TLBaseStore'
import { TLBaseContainer } from './TLBase/TLBaseContainer'
import { SettingTimeBar } from './SettingTime/SettingTimeBar'
import { SettingTimeProvider } from './SettingTime/SettingTimeStore'

export default function TLContainer() {

  return (
    <div style={{
      width: '100%',
      marginTop: '50px',
    }}>
      <TLProvider>
        <TLBaseProvider>
            <SettingTimeProvider>
                <div style={{margin: '10px', display: 'flex', flexDirection: 'column'}}>
                    <SettingTimeBar/>
                    <TLBaseContainer />
                </div>
            </SettingTimeProvider>
        </TLBaseProvider>
      </TLProvider>
    </div>
  )
}

