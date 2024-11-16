

// import VisTimeline from './TL'
import { TLProvider } from '../Store/TLStore'
import { TLBaseProvider } from '../TLBase/Store/TLBaseStore'
import { TLBase } from '../TLBase/UI/TLBase'

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
                <TLBase/>
            </div>
        </TLBaseProvider>
      </TLProvider>
    </div>
  )
}

export default TLContainer
