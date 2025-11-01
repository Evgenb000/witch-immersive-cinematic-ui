import React from "react";

interface Props {
  size?: number;
  color?: string;
}

export const SpinnerLoading: React.FC<Props> = ({
  size = 40,
  color = "text-blue-500",
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 ${color}`}
        style={{ width: size, height: size, borderTopColor: "currentColor" }}
      />
    </div>
  );
};
