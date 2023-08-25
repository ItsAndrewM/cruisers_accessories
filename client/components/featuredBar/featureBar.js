import { useEffect, useState } from 'react'
import { CenterModal, ModalTitle, ModalCloseTarget } from 'react-spring-modal'

const FeatureBar = ({
  title,
  description,
  action,
  hide,
  delay,
}) => {
  const [delayPassed, setDelayPassed] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setDelayPassed(true), delay || 6000)
    return () => clearTimeout(timeout)
  })
  return (
    <CenterModal isOpen={delayPassed && !hide}>
      <ModalTitle>{title}</ModalTitle>
      {description}
      <div sx={{ display: 'flex', justifyContent: 'center', p: [1, 2] }}>
        {action && action}
      </div>
    </CenterModal>
  )
}

export default FeatureBar
