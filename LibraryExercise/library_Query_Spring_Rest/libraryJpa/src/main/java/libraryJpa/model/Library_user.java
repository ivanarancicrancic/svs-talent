package libraryJpa.model;

import org.springframework.stereotype.Component;

import javax.persistence.*;

@Component
@javax.persistence.Entity
@Table(name = "user")
public class Library_user {
    @Id
//@GeneratedValue(strategy = GenerationType.AUTO)
@GeneratedValue(strategy = GenerationType.SEQUENCE)
@Column(name = "id", nullable = false, updatable = false, unique = true)
private int id;

    @Column(name = "name")
    String name;
    @Column(name = "surname")
    String surname;


    public Library_user(){}

    public Library_user(String name, String surname){

        this.name = name;
        this.surname = surname;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String toString(){

        return "Library_user name: " + this.name + ", surname: " + this.surname;
    }


}
