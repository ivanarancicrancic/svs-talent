package libraryJpa.model;

import org.springframework.stereotype.Component;

import javax.persistence.*;

@Component
@javax.persistence.Entity
@Table(name = "book")
public class Book{


    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private int id;

    @Column(name = "title")
    String name;
    @Column(name = "description")
    String description;


    public Book(){}

    public Book(String name,  String description){

        this.name = name;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String toString(){

        return "Book title: " + this.name + ", description: " + this.description;
    }

}
