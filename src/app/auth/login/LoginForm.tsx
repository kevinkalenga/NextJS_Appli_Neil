
'use client'

// import { useState } from 'react'
import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';
import { GiPadlock } from 'react-icons/gi';
import { useForm } from 'react-hook-form'
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const router = useRouter()
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  })

  const onSubmit = async (data: LoginSchema) => {
    // setErrorMessage(null) // reset erreur avant chaque tentative
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: '/members'
    })

    if (result?.ok) {
      router.push('/members')
    } else {
      // Affiche un message d'erreur friendly
      // setErrorMessage('Email and Password Invalid.')
      toast.error( result?.error as string)
    }
  }

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className='flex flex-col gap-2 items-center text-secondary'>
          <div className='flex flex-row items-center gap-3'>
            <GiPadlock size={30} />
            <h1 className='text-3xl font-semibold'>Login</h1>
          </div>
          <p className='text-neutral-500'>Welcome back to NextMatch</p>
        </div>
      </CardHeader>

      <CardBody>
        {/* Affichage du message d'erreur */}
        {/* {errorMessage && <div className="mb-4 text-center text-red-600">{errorMessage}</div>} */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input
              defaultValue=''
              label='Email'
              variant='bordered'
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=''
              label='Password'
              variant='bordered'
              type='password'
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color='secondary'
              type='submit'>
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}



// 'use client'
// import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';
// import { GiPadlock } from 'react-icons/gi';
// import {useForm} from 'react-hook-form'
// import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema';
// import {zodResolver} from '@hookform/resolvers/zod'
// import { signIn } from 'next-auth/react'; 
// import { useState } from 'react';

// // import { signIn } from '@/app/actions/authActions';
// // import { signInUser } from '@/app/actions/authActions';
// import { useRouter } from 'next/navigation';



// export default function LoginForm() {

//   const router = useRouter()
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm<LoginSchema>({
//     resolver: zodResolver(loginSchema), 
//     mode: 'onTouched'
//   })
  
//   // const onSubmit = async (data: LoginSchema) => {
//   //   const result = await signIn(data) 
//   //   if(result.status === 'success') {
//   //     router.push('/members');
//   //   } else {
//   //      console.log(result.error)
//   //   }
//   //   // console.log(data)
//   // } 

//   const onSubmit = async (data: LoginSchema) => {
//   const result = await signIn('credentials', {
//     email: data.email,
//     password: data.password,
//     redirect: false, // pour capturer l'erreur sans redirection immédiate
//     callbackUrl: '/members'
//   });
//    console.log('SignIn result:', result);

//   if (result?.ok) {
//     router.push('/members');
//   } else {
//     console.log('Login failed', result?.error);
//      setErrorMessage('Login failed: Invalid email or password');
//   }
// };
  
//   return (
//     <Card className="w-2/5 mx-auto">
//         <CardHeader className="flex flex-col items-center justify-center">
//             <div className='flex flex-col gap-2 items-center text-secondary'>
//                 <div className='flex flex-row items-center gap-3'>
//                     <GiPadlock size={30} />
//                     <h1 className='text-3xl font-semibold'>Login</h1>
//                 </div>
//                 <p className='text-neutral-500'>Welcome back to NextMatch</p>
//             </div>
//         </CardHeader>

//         <CardBody>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className='space-y-4'>
//                  <Input 
//                     defaultValue=''
//                     label='Email'
//                     variant='bordered'
//                     {...register('email')}
//                     isInvalid={!!errors.email}
//                     errorMessage={errors.email?.message as string}
//                  />
//                  <Input 
//                     defaultValue=''
//                     label='Password'
//                     variant='bordered'
//                     type='password'
//                     {...register('password')}
//                     isInvalid={!!errors.password}
//                     errorMessage={errors.password?.message as string}
//                  />
//                  <Button 
//                       isLoading={isSubmitting}
//                       isDisabled={!isValid} 
//                       fullWidth color='secondary' type='submit'>
//                      Login
//                  </Button>
//             </div>
//           </form>
//         </CardBody>

//     </Card>
//   )
// }
