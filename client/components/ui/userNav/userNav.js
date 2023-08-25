import Bag from '@/components/icons/bag'
import { useUI } from '../context'
import { Button } from 'theme-ui'

const UserNav = ({ className, children, ...props }) => {
  const { toggleSidebar } = useUI()

  return (
    <Button onClick={toggleSidebar} aria-label="Cart">
      <Bag />
    </Button>
  )
}

export default UserNav
