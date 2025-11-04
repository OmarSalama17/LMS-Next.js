import Chat from '../../../../Components/dashboard/Chat'
import React from 'react'

const page = async ({params}) => {
  const {locale} = await params
  return <Chat locale={locale}/>

}

export default page