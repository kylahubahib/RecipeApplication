// Program.cs
using System.Text;
using backend.Application.Services;
using backend.Domain.Interfaces;
using backend.Infrastructure.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// For JWT Tokens, authorization and authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// 3. Add Authorization
builder.Services.AddAuthorization();

// Whenever a class asks for IRecipeServices, provide an instance of RecipeServices.
builder.Services.AddScoped<IRecipeServices, RecipeServices>();
builder.Services.AddScoped<ICategoryServices, CategoryServices>();
builder.Services.AddScoped<IConvertImageServices, ConvertImageServices>();
builder.Services.AddScoped<IAuthServices, AuthServices>();
builder.Services.AddScoped<ITokenServices, TokenServices>();
// builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IValidationServices<RegisterDto>, RegisterValidation>();
builder.Services.AddScoped<IValidationServices<string>, PasswordValidation>();
builder.Services.AddScoped<IValidationServices<IFormFile>, ImageFileValidation>();


builder.Services.AddCors(opt =>
{
    opt.AddPolicy("DevCors", p =>
        p.WithOrigins("http://localhost:5173", "http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//     db.Database.Migrate(); 
// }


app.UseSwagger();
app.UseSwaggerUI();




app.UseHttpsRedirection();
app.UseCors("DevCors");

app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();
app.Run();