import { cn } from "@/utils/styles";

const CardImage = ({ className, children, ...props }: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
  <div className="relative">
    {children}
    <img className={cn('w-full h-48 rounded-t-2xl', className)} {...props} />
  </div>
)

const CardBody = ({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div className={cn('p-3 sm:p-4 space-y-2 border border-white border-t-0 rounded-b-2xl', className)} {...props} />
)

const Card = ({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div className={cn('bg-transparent', className)} {...props} />
)

Card.Body = CardBody
Card.Image = CardImage

export default Card
