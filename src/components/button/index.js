import React from "react";
import Link from "next/link";
import { Button } from "antd";

const ButtonComponent = ({
    type,
    children,
    title,
    path,
    icon,
    className,
    block,
    onClick,
    htmlType,
    loading,
    disabled,
    size,
    shape
}) => {
    return path ? (
        <Link href={path} passHref>
            <Button
                type={type}
                icon={icon}
                block={block}
                loading={loading}
                disabled={disabled || loading}
                size={size || "default"}
                className={className || null}
            >
                {children || title}
            </Button>
        </Link>
    ) : (
        <Button
            type={type}
            htmlType={htmlType || "button"}
            icon={icon}
            block={block}
            loading={loading}
            disabled={disabled || loading}
            size={size || "default"}
            className={className || null}
            onClick={onClick}
            shape={shape || "default"}
        >
            {children || title}
        </Button>
    );
};

export default ButtonComponent;
