using api.Core.Entities.Consumer;

namespace api.Core.Interfaces.ConsumerDept
{
    public interface IAccountRepository
    {
         Task AddStudent(Student student);
         Task AddTeacher(Teacher teacher);
         Task AddStaff(Staff staff);

         Task<bool> IsUserNameExits(string userName);

         Task<bool> CheckedPassword(string password);

         
    }
}