using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    public string FullName { get; set; } = "";

    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    public string Email { get; set; } = "";

    [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$",
        ErrorMessage = "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number."
    )]
    public string Password { get; set; } = "";
}

public class LoginDto
{
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}

public class AuthResult
{
    public string Token { get; set; } = "";
    public DateTime ExpiresAt { get; set; }
    public LoginUser? User { get; set; }
    public bool? Success;
    public string? Message;
}

public class LoginUser
{
    public int UserId { get; set; }
    public string FullName { get; set; } = "";
}
