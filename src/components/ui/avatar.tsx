export const Avatar = ({ children, className }: any) => <div className={className}>{children}</div>;
export const AvatarImage = ({ src, alt }: any) => <img src={src} alt={alt} />;
export const AvatarFallback = ({ children }: any) => <span>{children}</span>; 