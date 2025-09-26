// Program.cs
using backend.Application.Services;
using backend.Domain.Interfaces;
using backend.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Whenever a class asks for IRecipeServices, provide an instance of RecipeServices.
builder.Services.AddScoped<IRecipeServices, RecipeServices>();
builder.Services.AddScoped<IConvertImageServices, ConvertImageServices>();


builder.Services.AddCors(opt =>
{
    opt.AddPolicy("DevCors", p =>
        p.WithOrigins("http://localhost:5173", "http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("DevCors");

app.MapControllers();
app.Run();