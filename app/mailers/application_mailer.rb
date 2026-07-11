class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAILER_SENDER", "hello@cyrusbaptiste.com")
  layout "mailer"
end
