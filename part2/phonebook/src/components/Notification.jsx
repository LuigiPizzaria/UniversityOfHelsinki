const Notification = ({ notification }) => {
  if (!notification) {
    console.log('no notification')
    return null
  }

  
if(notification.type === 'success') {
    console.log('success notification')
  }

if(notification.type === 'error') {
    console.log('error notification')
}
  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification