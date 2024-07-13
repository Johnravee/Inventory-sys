import { InfinitySpin } from 'react-loader-spinner'

function Tableloader() {
  return (
    <div>
       <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        />
    </div>
  )
}

export default Tableloader
