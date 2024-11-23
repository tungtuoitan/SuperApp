

// import VisTimeline from './TLContainer'
import { TLProvider } from '../Store/TLStore'
import { TLBaseProvider } from '../TLBase/Store/TLBaseStore'
import { TL1TBY } from './TL1TBY'
import { TLCont2 } from './TLCont2'

function TLContainer() {

  return (
    <div style={{
      // border: '4px solid red',
      width: '100%',
      marginTop: '50px',
    }}>
      <TLProvider>
        <TLBaseProvider>
            <div style={{margin: '10px'}}>
                <TLCont2 />
            </div>
        </TLBaseProvider>
      </TLProvider>
    </div>
  )
}

export default TLContainer
