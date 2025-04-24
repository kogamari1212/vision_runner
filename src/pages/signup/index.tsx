import Header from '@/components/Header';
import SignUp from '@/components/SignUp';
import React from 'react'

const signup = () => {
  return (
    <div>
      {/* この中に設定したいパーツを読み込ませる */}
      <Header />
      <SignUp />
    </div>
  )
}

export default signup;