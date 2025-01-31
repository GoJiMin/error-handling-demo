import UnPredictableErrorBoundary from "./UnPredictableErrorBoundary";
import ErrorCatcher from "./Errorcatcher";
import QueryClientBoundary from "./QueryClientBoundary";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnPredictableErrorBoundary>
      <ErrorCatcher>
        <QueryClientBoundary>{children}</QueryClientBoundary>
      </ErrorCatcher>
    </UnPredictableErrorBoundary>
  );
};

export default Providers;
