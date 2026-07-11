class ApplicationJob < ActiveJob::Base
  # Automatically retry jobs that encountered a deadlock
  retry_on ActiveRecord::Deadlocked, attempts: 3, wait: :polynomially_longer

  # Most jobs are safe to ignore if the underlying records are no longer available
  discard_on ActiveJob::DeserializationError

  # Log all unhandled failures so operators know something broke, then re-raise
  # so Solid Queue records the failure and can be inspected.
  rescue_from(StandardError) do |exception|
    Rails.logger.error(
      "[#{self.class.name}] Failed (attempt #{executions}/#{self.class.try(:retry_limit) || '?'}): " \
      "#{exception.class}: #{exception.message}"
    )
    raise
  end
end
