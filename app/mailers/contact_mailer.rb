class ContactMailer < ApplicationMailer
  default to: "cyrusbaptiste667@gmail.com"

  def message(name:, email:, body:)
    @name = name
    @email = email
    @body = body
    mail(
      reply_to: email,
      subject: "Nuevo mensaje de #{name} — cyrusbaptiste.com"
    )
  end
end
