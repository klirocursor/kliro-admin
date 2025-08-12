import { Spin } from "antd";

type InputSuffixLoadingProps = {
  isLoading?: boolean;
};

export const InputSuffixLoading = ({
  isLoading = false,
}: InputSuffixLoadingProps) => {
  return <Spin size="small" spinning={isLoading} />;
};
