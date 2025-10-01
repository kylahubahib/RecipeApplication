public class RegisterDto
{
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}

public class LoginDto
{
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
