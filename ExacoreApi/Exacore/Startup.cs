using AutoMapper;
using Exacore.BLL.AuthBL;
using Exacore.BLL.AuthBL.Interfaces;
using Exacore.BLL.FormsBL;
using Exacore.BLL.FormsBL.Interfaces;
using Exacore.BLL.LookupsBL;
using Exacore.BLL.LookupsBL.Interfaces;
using Exacore.BLL.PdfBL;
using Exacore.BLL.PdfBL.Interfaces;
using Exacore.DAL;
using Exacore.Filter;
using Exacore.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
//addxxxusings

namespace Exacore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            IMapper mapper = AutoMapperSetup.Configure().CreateMapper();
            services.AddSingleton(mapper);

            var secret = Configuration.GetSection("AppSettings:JwtSecret").Value;
            var issuer = Configuration.GetSection("AppSettings:Issuer").Value;
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = issuer,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),

                    };
                });

            services.AddMvc(options =>
            {
                options.Filters.Add(new ErrorHandlingFilter());
            });

            services.AddDbContext<ExacoreContext>(options =>
                          options.UseSqlServer(Configuration.GetConnectionString("ExacoreContext")));

            services.AddCors(options =>
            {
                options.AddPolicy("_myCors",
                                  builder => builder.WithOrigins("*", "*", "*", "*")
                                                    .AllowAnyHeader()
                                                    .AllowAnyMethod()
                                                    .AllowAnyOrigin());
            });

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddSwaggerDocument();

            services.AddTransient<IAccountLogic, AccountLogic>();
            services.AddTransient<ILoginLogic, LoginLogic>();
            services.AddTransient<IRefreshTokenLogic, RefreshTokenLogic>();
            services.AddTransient<IRoleLogic, RoleLogic>();
            services.AddTransient<IUserLogic, UserLogic>();
            services.AddTransient<IUserGuidLogic, UserGuidLogic>();

            services.AddTransient<IAlertTimeLogic, AlertTimeLogic>();
            services.AddTransient<IControlMethodLogic, ControlMethodLogic>();
            services.AddTransient<IDepartmentLogic, DepartmentLogic>();
            services.AddTransient<IDivisionLogic, DivisionLogic>();
            services.AddTransient<IGoodCatchTypeLogic, GoodCatchTypeLogic>();
            services.AddTransient<INearMissTypeLogic, NearMissTypeLogic>();
            services.AddTransient<IProjectLogic, ProjectLogic>();

            services.AddTransient<IFormLogic, FormLogic>();
            services.AddTransient<IGoodCatchLogic, GoodCatchLogic>();
            services.AddTransient<IIncidentAlertLogic, IncidentAlertLogic>();
            services.AddTransient<IJsaLogic, JsaLogic>();
            services.AddTransient<INearMissLogic, NearMissLogic>();
            services.AddTransient<ISiteSafetyOrientationLogic, SiteSafetyOrientationLogic>();
            services.AddTransient<IMotorizedEquipmentLogic, MotorizedEquipmentLogic>();
            services.AddTransient<IToolboxMeetingLogic, ToolboxMeetingLogic>();

            services.AddTransient<IGoodCatchPdf, GoodCatchPdf>();
            services.AddTransient<IIncidentAlertPdf, IncidentAlertPdf>();
            services.AddTransient<IJsaPdf, JsaPdf>();
            services.AddTransient<IMotorizedEquipmentPdf, MotorizedEquipmentPdf>();
            services.AddTransient<INearMissPdf, NearMissPdf>();
            services.AddTransient<ISiteSafetyOrientationPdf, SiteSafetyOrientationPdf>();
            services.AddTransient<IToolboxMeetingPdf, ToolboxMeetingPdf>();

            //addmore

            services.AddScoped<IExacoreContext, ExacoreContext>();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHttpContextAccessor accessor)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseOpenApi(); // serve OpenAPI/Swagger documents
            app.UseSwaggerUi3(config => config.TransformToExternalPath = (internalUiRoute, request) =>
            {
                if (internalUiRoute.StartsWith("/") == true && internalUiRoute.StartsWith(request.PathBase) == false)
                {
                    return request.PathBase + internalUiRoute;
                }
                else
                {
                    return internalUiRoute;
                }
            });
            HttpContext.Configure(accessor);

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("_myCors");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
