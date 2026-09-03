import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ id, className = "", wrapperStyle, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="password-input-wrapper" style={wrapperStyle}>
      <input
        id={id}
        {...props}
        type={showPassword ? "text" : "password"}
        className={`input-field ${className}`}
      />
      <button
        type="button"
        className="password-toggle-btn"
        onClick={toggleVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
        title={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
      </button>
    </div>
  );
}
