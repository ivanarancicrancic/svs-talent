package libraryJpa.repository;

import libraryJpa.model.Library_user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJPARepository extends JpaRepository<Library_user, Long> {
}
