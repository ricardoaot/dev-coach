interface ButtonProps {
    type: "button" | "submit" | "reset";
    children:React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
  }
  
  export const Button: React.FC<ButtonProps> = ({ type, children, onClick, className }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={false}
        className={`px-4 py-2 rounded hover:bg-blue-600 ${className}`}
      >
        {children}
      </button>
    );
  };