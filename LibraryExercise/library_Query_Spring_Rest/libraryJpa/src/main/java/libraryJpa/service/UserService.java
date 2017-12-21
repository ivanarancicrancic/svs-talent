package libraryJpa.service;

import libraryJpa.model.Library_user;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserService {
    public Library_user createUser(Library_user libraryuser);
    public List<Library_user> getAllLibAccounts();
    public Library_user getUser(Long id);
    public Library_user updateUser(Long id, Library_user libraryuser);
    public Library_user deleteUser(Long id);

}
