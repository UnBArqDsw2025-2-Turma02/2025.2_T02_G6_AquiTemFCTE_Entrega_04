def check_matricula_is_equal_from_email(email: str, matricula: str) -> bool:
    parts = email.split("@")
    matricula_from_email, _ = parts

    if matricula_from_email.strip() != matricula.strip():
        return False
    else:
        return True