import { Mailer } from 'nodemailer-react'
import { useStateContext } from '../context/ContextProvider'

const { user } = useStateContext();
console.log(user);
const transport = {
    host: 'smtp.example.com',
    secure: true,
    auth: { user: 'vcafe.vit@gmail.com', pass: 'iajvttvshuwapnzx' },
  }
  const defaults = {
    from: "vcafe.vit@gmail.com",
}
export const VerificationEmail = () => ({
    subject: `Verification of Docs Submitted By: ${user.name}`,
    body: (
      <div>
        <p>Hello vdocsAdmin!</p>
        <p>Studen: {user.name} with email: {user.email} has uploaded and requested verification of documents</p>
      </div>
    )
  })

export const mailer = Mailer(
        { transport, defaults },
        { VerificationEmail }
)
