using api.Core.Entities.Consumer;

namespace api.Core.Interfaces.ConsumerDept
{
    public interface IAccountService
    {
         Task AddStudent(Student student);
         Task AddTeacher(Teacher teacher);
         Task AddStaff(Staff staff);

         
    }
}