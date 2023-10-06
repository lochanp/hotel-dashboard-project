import Image from 'next/image'
import toast from 'react-hot-toast'

// Custom toast types
const toastTypes = {
  success: {
    style: {
      border: '1px solid #29CC6A',
      backgroundColor: '#ECFFF4'
    },
    icon: <Image src={'/images/icons/ic-success-toast.png'} width={24} height={24} alt='success icon' />
  },
  error: {
    style: {
      border: '1px solid #FF4D4D',
      backgroundColor: '#FFE1E1'
    },
    icon: <Image src={'/images/icons/ic-error-toast.png'} width={24} height={24} alt='error icon' />
  }
}

export default function showToast(message, type) {
  const toastType = toastTypes[type] || toastTypes.success // Default to success if type is not recognized
  toast(message, {
    style: toastType.style,
    icon: toastType.icon
  })
}
