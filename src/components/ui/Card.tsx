import { cn } from "@/utils/styles";
import { ReactNode } from "react";

const CardImage = ({ className, ...props }: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
  <img className={cn('w-full h-48 rounded-t-2xl', className)} {...props} />
)

const CardBody = ({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div className={cn('p-3 sm:p-4 space-y-2 border border-white border-t-0 rounded-b-2xl', className)} {...props} />
)

const Card = ({ children, ...props }: { children: ReactNode }) => (
  <div className='bg-transparent' {...props}>{children}</div>
)

Card.Body = CardBody
Card.Image = CardImage

export default Card
