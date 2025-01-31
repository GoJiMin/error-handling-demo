import { ErrorBoundary } from "react-error-boundary";

const UnPredictableErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ErrorBoundary fallback={<p>알 수 없는 에러야!!</p>}>
      {children}
    </ErrorBoundary>
  );
};

export default UnPredictableErrorBoundary;
